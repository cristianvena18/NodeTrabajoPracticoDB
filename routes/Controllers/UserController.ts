import { User } from "../../orm/entity/User";

export const createUser = async (req, res) => {
    const nickname = req.body.nickname;

    const user = new User();
    user.nickname = nickname;
    user.isActive = true;

    try {
        await user.save();

        res.json({message: 'Todo bien', user});
    }
    catch (e) {
        res.status(500).end('DB error');
    }
}

export const listUser = async (req, res) => {

    // Get the Post data

    const { userid } = req.headers;

    const user = await User.findOne({nickname: userid});

    // Respond

    res.json({ user });
}