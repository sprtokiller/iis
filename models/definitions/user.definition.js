const DataTypes = require("sequelize");

module.exports = (sequelize) => {
    const User = sequelize.define("_x_users",
        {
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true
            },
            passhash: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            role_id: {
                type: DataTypes.TINYINT,
                allowNull: false,
                defaultValue: 1
            },
            firstname: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            lastname: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            img_path: {
                type: DataTypes.STRING(255),
            },
            karma: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0
            },
            brief: {
                type: DataTypes.TEXT
            },
            register_date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            update_date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
        },
        {
            createdAt: 'register_date',
            updatedAt: 'update_date',
            underscored: true,
            freezeTableName: true
        }
    );

    User.associate = function (models) {
        User.hasMany(models.Event, { foreignKey: 'author_id' });
        User.hasMany(models.EventComment, { foreignKey: 'user_id' });
        User.belongsToMany(models.Event, { otherKey: 'event_id', foreignKey: 'user_id', through: models.UserLikesEvent });
    };

    return User;
}