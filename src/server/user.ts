import express from 'express';
import { ERROR_MESSAGE, PROFILE_IMAGE_SIZE } from 'shared/constant';
import { TUser } from 'shared/types';

declare module 'express-session' {
  interface SessionData {
    user: TUser;
  }
}

const router = express.Router();

let userList: Array<TUser> = [];
let userId = 0;

router.get('/', (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ message: ERROR_MESSAGE.NOT_LOGINED });
  }
});

router.post('/', (req, res) => {
  if (req.session.user) {
    res.status(409).json({ message: ERROR_MESSAGE.ALREADY_LOGINED });
    return;
  }

  const { name } = req.body;

  if (userList.filter((user) => user.name === name).length > 0) {
    res.status(409).json({ message: ERROR_MESSAGE.DUPLICATED_USER });
    return;
  }

  const user = {
    id: userId.toString(),
    name,
    imgUrl: `http://gravatar.com/avatar/${userId++}?d=identicon&s=${PROFILE_IMAGE_SIZE}`,
  };

  userList.push(user);
  req.session.user = user;

  res.status(201).json({ user });
});

router.delete('/', (req, res) => {
  const { id } = req.session.user;

  userList = userList.filter((user) => user.id !== id);

  req.session.destroy((err) => err && console.log(err));

  res.status(203).json();
});

export default router;
