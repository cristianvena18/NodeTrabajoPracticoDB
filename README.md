# NodeTrabajoPracticoDB
Trabajo practico para el modulo de base de datos.


#Busqueda de usuarios por nickname.
  Pegarle al endpoint /user con un get con el siguiente objeto en los headers:
    {
      userid: usuario a buscar
    }
#Busqueda de posts por contenido.
  Pegarle al endpoint /post con un get con el siguiente objeto en el header:
    {
      content: palabras a buscar
    }
#Todos los posts de cierto usuario filtrados por categoria o no.
  Pegarle al endpoint /userposts con un get con el siguiente objeto en el header:
    {
      userid: nombre del usuario,
      category: nombre de la categoria (no es obligatorio)
    }
#Todos los posts de cierta categoria.
  Pegarle al endpoint /category con un get con el siguiente objeto en el header:
    {
      category: nombre de la categoria
    }
#Crear un post.
  Pegarle al endpoint /post con un post con el siguiente objeto en el body:
    {
      userid: nombre de usuario,
      content: contenido del post,
      title: titulo del post,
      category: nombre de la categoria
    }
#Crear un usuario.
  Pegarle al endpoint /user con un post con el siguiente objeto en el body:
  {
    nickname: nombre del usuario,
  }
