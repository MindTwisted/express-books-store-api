'use strict';

import { Router } from 'express';
import AuthController from '@controllers/AuthController';
import AuthorController from '@controllers/AuthorController';
import GenreController from '@controllers/GenreController';
import BookController from '@controllers/BookController';
import ErrorHandleMiddleware from '@middlewares/ErrorHandleMiddleware';
import AuthenticationMiddleware from '@middlewares/AuthenticationMiddleware';
import IsLoggedInMiddleware from '@middlewares/IsLoggedInMiddleware';
import IsAdminMiddleware from '@middlewares/IsAdminMiddleware';

const router: Router = Router();

router.use(AuthenticationMiddleware);

router.get('/auth', [IsLoggedInMiddleware], AuthController.current);
router.post('/auth', AuthController.register);
router.put('/auth', AuthController.login);

router.get('/authors', AuthorController.index);
router.get('/authors/:id', AuthorController.show);
router.post('/authors', [IsLoggedInMiddleware, IsAdminMiddleware], AuthorController.store);
router.put('/authors/:id', [IsLoggedInMiddleware, IsAdminMiddleware], AuthorController.update);
router.delete('/authors/:id', [IsLoggedInMiddleware, IsAdminMiddleware], AuthorController.destroy);

router.get('/genres', GenreController.index);
router.get('/genres/:id', GenreController.show);
router.post('/genres', [IsLoggedInMiddleware, IsAdminMiddleware], GenreController.store);
router.put('/genres/:id', [IsLoggedInMiddleware, IsAdminMiddleware], GenreController.update);
router.delete('/genres/:id', [IsLoggedInMiddleware, IsAdminMiddleware], GenreController.destroy);

router.get('/books', BookController.index);

router.use(ErrorHandleMiddleware);

export default router;