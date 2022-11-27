const DataTypes = require("sequelize");

module.exports = (sequelize) => {
    const EventImage = sequelize.define("_x_event_images",
        {
            img_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            img_path: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
        },
        {
            timestamps: false, 
            freezeTableName: true,
            underscored: true
        }
    );

    EventImage.associate = function (models) {
        EventImage.belongsTo(models.Event, {
            foreignKey: {
                name: 'event_id',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
    };
    return EventImage;
}