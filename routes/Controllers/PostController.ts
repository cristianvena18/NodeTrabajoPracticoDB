import { Post } from '../../orm/entity/Post';
import { User } from '../../orm/entity/User';
import {Category} from '../../orm/entity/Category';
import { Like } from 'typeorm';

export const createPost = async (req, res) => {

    // Get the Post data

    const {title, content, userid, category} = req.body;

    // Create the Post

    const post = new Post();
    post.title = title;
    post.content = content;

    // Get the User and Category entity,

    const user = await User.findOne({nickname: userid});
    post.craftedBy = user;                    // Validar si existe el usuario!

    const categoryId = await Category.findOne({name: category});
    // Si no existe la categoria crearla

    if(!categoryId){
      const categoryNew = new Category();
      categoryNew.name = category;
      await categoryNew.save();
      post.category = categoryNew;
    }
    else{
      post.category = categoryId;
    }

    await post.save();

    // Respond

    res.json({ post: Post, message: "The post was created succesfully" });

}

export const listPostsByUser = async (req, res) => {
  const user = req.headers.userid;
  const category = req.headers.category;

  const userId = await User.findOne({nickname: user});

  console.log(category);

  if (category === undefined){    
    const posts = await Post.find({craftedBy: userId});

    res.json({posts});
  }
  else {
    const categoryId = await Category.findOne({name: category});

    const posts = await Post.find({craftedBy: userId, category: categoryId});
    
    res.json({posts});
  }
}

export const listPosts = async (req, res) => {

  const content = req.headers.content;  
  
  const posts = await Post.find({content: Like("%" + content + "%")});

  res.json({posts});
}
