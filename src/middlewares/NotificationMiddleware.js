import ThuyenVienController from '../controllers/ThuyenVienController';

const NotificationMiddleware = {
    async injectNotificationData(req, res, next) {
        try {
            // Skip if not authenticated
            if (!req.session || !req.session.user) {
                return next();
            }
            
            // Get notification counts
            const notificationData = await ThuyenVienController.getNotificationCounts();

            console.log('Notification data:', notificationData);
            
            // Attach to res.locals so views can access it
            res.locals.notifications = notificationData;
            
            next();
        } catch (error) {
            console.error('Error in notification middleware:', error);
            next();
        }
    }
};

export default NotificationMiddleware;
