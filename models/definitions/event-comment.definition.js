const DataTypes = require("sequelize");

module.exports = (sequelize) => {
    const EventComment = sequelize.define("_x_event_comments",
        {
            comment_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            text: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            comment_time: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            comment_karma: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0
            },
        },
        {
            createdAt: 'comment_time',
            freezeTableName: true,
            underscored: true
        }
    );

    EventComment.associate = function (models) {
        EventComment.belongsTo(models.Event, {
            foreignKey: {
                name: 'event_id',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
        EventComment.belongsTo(models.User, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
    };
    return EventComment;
}