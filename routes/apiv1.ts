import { Router } from 'express'
import { createPost, listPostsByUser, listPosts } from './Controllers/PostController';
import { createUser, listUser } from './Controllers/UserController';
import {listCategory} from './Controllers/CategoryController';

const router = Router()

router.post('/user', createUser);               //crea un usuario

router.post('/post', createPost);               //crear post
router.get('/post', listPosts);                 //busca los post por contenido
router.get('/user', listUser);                  //busca los usuarios por nickname
router.get('/category', listCategory)           //busca los post por categoria
router.get('/userposts', listPostsByUser)       //busca los post de cierto usuario filtrados por categoria o no
router.use('/', (req, res) => { res.json({message: 'API Entry Point'})});

export {router}
