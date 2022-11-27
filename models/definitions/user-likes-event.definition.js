module.exports = (sequelize) => {
    const UserLikesEvent = sequelize.define("_x_user_likes_event",
        {},
        {  
            timestamps: false,
            freezeTableName: true
        }
    );

    return UserLikesEvent;
}