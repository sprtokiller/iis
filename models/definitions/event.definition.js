const DataTypes = require("sequelize");

module.exports = (sequelize) => {
    const Event = sequelize.define("_x_events",
        {
            event_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            description: {
                type: DataTypes.STRING(4000),
                allowNull: false
            },
            duration_btag: {
                type: DataTypes.TINYINT(3).UNSIGNED,
                allowNull: false,
                defaultValue: 0
            },
            type_btag: {
                type: DataTypes.SMALLINT(5).UNSIGNED,
                allowNull: false,
                defaultValue: 0
            },
            topic_btag: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                defaultValue: 0
            },
            location: {
                type: DataTypes.STRING(255)
            },
            img_path: {
                type: DataTypes.STRING(255)
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                defaultValue: 0,
                allowNull: false
            },
            views: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0
            },
            state: {
                type: DataTypes.ENUM('draft', 'review', 'published'),
            },
            org_name: {
                type: DataTypes.STRING(255),
                allowNull: false
            }
        },
        {
            underscored: true,
            freezeTableName: true
        }
    );

    Event.associate = function (models) {
        Event.belongsTo(models.User, { foreignKey: 'author_id' });
        Event.belongsToMany(models.User, { otherKey: 'user_id', foreignKey: 'event_id', through: models.UserLikesEvent });
        Event.hasMany(models.EventURL, { foreignKey: 'event_id' });
        Event.hasMany(models.EventImage, { foreignKey: 'event_id' });
        Event.hasMany(models.EventTerm, { foreignKey: 'event_id' });
        Event.hasMany(models.EventComment, { foreignKey: 'event_id' });
    };


    return Event;
}
