const DataTypes = require("sequelize");

module.exports = (sequelize) => {
    const EventURL = sequelize.define("_x_event_urls",
        {
            url_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            url: {
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

    EventURL.associate = function (models) {
        EventURL.belongsTo(models.Event, {
            foreignKey: {
                name: 'event_id',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
    };
    return EventURL;
}