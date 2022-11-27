const DataTypes = require("sequelize");

module.exports = (sequelize) => {
    const EventTerm = sequelize.define("_x_event_terms",
        {
            term_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            description: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            start_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            end_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
        },
        {
            timestamps: false, 
            freezeTableName: true,
            underscored: true
        }
    );

    EventTerm.associate = function (models) {
        EventTerm.belongsTo(models.Event, {
            foreignKey: {
                name: 'event_id',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
    };
    return EventTerm;
}