import { Post } from '../../orm/entity/Post';
import { User } from '../../orm/entity/User';
import {Category} from '../../orm/entity/Category';
import { Like } from 'typeorm';

export const createPost = async (req, res) => {

    // Get the Post data

    const {title, content, userid, category} = req.body;

    const user = await User.findOne({nickname: userid});

    if(user){

      const post = new Post();
      if (title && content){
        post.title = title;
        post.content = content;
      }
      else{
        res.status(400).json({message: "No se han encontrado los valores validos para realizar la operación"});
      }
      post.craftedBy = user;

      const categoryId = await Category.findOne({name: category});

      if(!categoryId){
        const categoryNew = new Category();
        categoryNew.name = category;
        try {

          await categoryNew.save();

        } catch (error) {

          res.status(500).json({message: "Error DB"});

        }
        
        post.category = categoryNew;
      }
      else{
        post.category = categoryId;
      }

      try {
        
        await post.save();

        res.status(201).json({ post: Post, message: "The post was created succesfully" });

      } catch (error) {
        res.status(500).json({ message: "Error DB" });
      }
    }
    else{
      res.status(401).json({message: "el usuario que se ingresó no está registrado"});
    }
}

export const listPostsByUser = async (req, res) => {
  const user = req.headers.userid;
  const category = req.headers.category;

  if(user){
    const userId = await User.findOne({nickname: user});

    if(userId){
      if (category === undefined){
        const posts = await Post.find({craftedBy: userId});
    
        res.status(200).json({posts});
      }
      else {
        const categoryId = await Category.findOne({name: category});
    
        const posts = await Post.find({craftedBy: userId, category: categoryId});
        
        res.status(200).json({posts});
      }
    }
    else{
      res.status(404).json({message: "No se a encontrado el usuario ingresado"});
    }
  }
  else{
    res.status(400).json({message: "No se han encontrado los valores validos para realizar la operación"});
  }

  
}

export const listPosts = async (req, res) => {

  const content = req.headers.content;  
  if(content){
    const posts = await Post.find({content: Like("%" + content + "%")});

    res.json({posts});
  }
  else{
    res.status(400).json({message: "No se han encontrado los valores validos para realizar la operación"})
  }
}
