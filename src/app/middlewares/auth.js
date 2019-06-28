// Irá verificar se o usuário está logado

import jwt from 'jsonwebtoken';

//Transforma uma callback em async-await
import { promisify } from 'util';

// Onde está o segredo do token, usado pra descriptografar
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  // Token
  const authHeader = req.headers.authorization;

  // Verifica se o token foi enviado no auth
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // Dividir a string do token
  const [, token] = authHeader.split(' ');

  try {
    // Método verify é uma callback, por isso usa-se o promisify
    // No SessionContoller, na hora de gerar o token, passamos o id como
    // payload, e é ele que deve ser retornado aqui caso dê certo
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // Será enviado no body para que o usuário não necessite enviar o id
    // repetidas vezes
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
