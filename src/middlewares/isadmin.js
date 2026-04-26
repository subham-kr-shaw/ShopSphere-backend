const isadmin = async (req, res, next) => {
    // ✅ authentication runs first and sets req.user
    // so we just check the role here
    try {
        if (!req.user) {
            return res.status(401).send({ message: "Not authenticated" });
        }
        if (req.user.role !== "admin") {
            return res.status(403).send({ message: "Access denied — admins only" });
        }
        next();
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

module.exports = isadmin;