import { User } from "../../orm/entity/User";

export const createUser = async (req, res) => {    
    const nickname = req.body.nickname;

    if(nickname){
        const user = new User();
        user.nickname = nickname;
        user.isActive = true;

        try {
            await user.save();

            res.status(201).json({message: 'Usuario creado!', user});
        }
        catch (e) {
            res.status(500).end('DB error');
        }
    }
    else{
        res.status(400).json({message: "No se han encontrado los valores validos para realizar la operación"});
    }
}

export const listUser = async (req, res) => {

    // Get the Post data

    const { userid } = req.headers;

    if(userid){
        const user = await User.findOne({nickname: userid});

        // Respond

        res.status(200).json({ user });
    }
    else{
        res.status(400).json({message: "No se han encontrado los valores validos para realizar la operación"});
    }
}