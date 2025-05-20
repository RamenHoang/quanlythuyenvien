import express from "express";
import ChungChiController from '../controllers/ChungChiController';
import UserController from '../controllers/UserController';
import ThuyenVienController from '../controllers/ThuyenVienController';
import AuthController from '../controllers/AuthController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import NotificationMiddleware from '../middlewares/NotificationMiddleware';

const router = express.Router();

const initWebRoutes = (app) => {
    // Auth routes
    router.get('/login', AuthController.getLoginPage);
    router.post('/login', AuthController.handleLogin);
    router.get('/logout', AuthController.handleLogout);
    
    // Access denied route
    router.get('/access-denied', (req, res) => {
        res.render('access-denied.ejs', {
            message: 'Bạn không có quyền truy cập trang này',
            user: req.session && req.session.user ? req.session.user : null,
            activeMenu: ''
        });
    });
    
    // Protected routes - require authentication
    router.use('/', (req, res, next) => {
        // Skip authentication check for login routes
        if (req.path === '/login' || req.path === '/logout' || req.path === '/access-denied') {
            return next();
        }
        return AuthMiddleware.isAuthenticated(req, res, next);
    });
    
    // Add notification middleware for authenticated routes
    router.use(NotificationMiddleware.injectNotificationData);
    
    // Dashboard route
    router.get('/', AuthMiddleware.checkPermission, (req, res) => {
        res.render('trangchu.ejs', { 
            activeMenu: 'dashboard',
            user: req.session.user
        });
    });
    
    // Apply permission check to all other routes
    router.use((req, res, next) => {
        // Skip permission check for login routes
        if (req.path === '/login' || req.path === '/logout' || req.path === '/access-denied' || req.path === '/') {
            return next();
        }
        return AuthMiddleware.checkPermission(req, res, next);
    });
    
    //thuyền viên ở đây
    router.post('/them-lich-su-di-tau', ThuyenVienController.createLichSuDiTau);
    router.post('/cap-nhat-lich-su-di-tau', ThuyenVienController.updateLichSuDiTau);
    router.get('/danh-sach-thuyen-vien', ThuyenVienController.getAllThuyenVien);
    router.get('/danh-sach-thuyen-vien/:id', ThuyenVienController.getThuyenVienById);
    router.post('/cap-nhat-thuyen-vien/:id', ThuyenVienController.putThuyenVien);
    router.post('/cap-nhat-than-nhan/:id', ThuyenVienController.updateThanNhan);
    router.get('/them-thuyen-vien', ThuyenVienController.getAddThuyenVienForm);
    router.post('/them-thuyen-vien', ThuyenVienController.createNewThuyenVien);
    
    // Correct the route for viewing crew details
    router.get('/thuyen-vien/:id', ThuyenVienController.getThuyenVienById);
    
    // user ở đây
    router.get('/danh-sach-user', UserController.getAllUser);
    
    //chứng chỉ ở đâyđây
    router.get('/danh-sach-chung-chi', ChungChiController.getAllChungChi);
    router.get('/lich-su-di-tau', ChungChiController.getAllLichSuDiTau);
    router.post('/post-chungchi', ChungChiController.postChungChi);
    router.post('/edit-chungchi', ChungChiController.getEditChungChi);
    router.post('/put-chungchi', ChungChiController.putChungChi);
    router.post('/delete-chungchi', ChungChiController.deleteChungChi);
    
    // Education routes
    router.post('/them-hoc-van', ThuyenVienController.createHocVan);
    router.post('/cap-nhat-hoc-van', ThuyenVienController.updateHocVan);
    router.get('/xoa-hoc-van/:id/:thuyenvien_id', ThuyenVienController.deleteHocVan);
    
    // Language certificate routes
    router.post('/them-ngoai-ngu', ThuyenVienController.createNgoaiNgu);
    router.post('/cap-nhat-ngoai-ngu', ThuyenVienController.updateNgoaiNgu);
    router.get('/xoa-ngoai-ngu/:id/:thuyenvien_id', ThuyenVienController.deleteNgoaiNgu);
    
    // Crew certificate routes
    router.post('/them-chung-chi', ThuyenVienController.createChungChi);
    router.post('/cap-nhat-chung-chi', ThuyenVienController.updateChungChi);
    router.get('/xoa-chung-chi/:id/:thuyenvien_id', ThuyenVienController.deleteChungChi);
    
    // Document routes
    router.post('/upload-tai-lieu/:id', ThuyenVienController.uploadTaiLieu);
    router.get('/xoa-tai-lieu/:id/:field', ThuyenVienController.deleteTaiLieuFile);
    
    // Certificate expiration routes
    router.get('/cer-expiring', ThuyenVienController.getExpiringCertificates);
    router.get('/cer-expired', ThuyenVienController.getExpiredCertificates);
    
    // Add status update route
    router.post('/cap-nhat-trang-thai/:id', ThuyenVienController.updateThuyenVienStatus);
    
    // Add photo upload route
    router.post('/upload-anh-thuyen-vien/:id', ThuyenVienController.uploadThuyenVienPhoto);
    
    // Add API endpoint to get all certificates
    router.get('/api/chung-chi', ThuyenVienController.getAllChungChi);
    
    // Add API endpoint to get crew members with specific certificates
    router.get('/api/crew-with-certificates', ThuyenVienController.getCrewWithCertificates);
    
    app.use("/", router);
};

export default initWebRoutes;