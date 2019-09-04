import { Post } from '../../orm/entity/Post';
import {Category} from '../../orm/entity/Category';

export const listCategory = async (req, res) => {

    const category = req.headers.category;

    const categoryId = await Category.findOne({name: category});

    const posts = await Post.find({category: categoryId});

    res.json({posts});
}