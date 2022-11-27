module.exports = async (sequelize) => {

    const models = {
        Event : require('./definitions/event.definition')(sequelize),
        User : require('./definitions/user.definition')(sequelize),
        UserLikesEvent: require('./definitions/user-likes-event.definition')(sequelize),
        EventURL: require('./definitions/event-url.definition')(sequelize),
        EventImage: require('./definitions/event-image.definition')(sequelize),
        EventTerm: require('./definitions/event-term.definition')(sequelize),
        EventComment: require('./definitions/event-comment.definition')(sequelize),
    };
    
    // call associate on each of the models
    Object.keys(models).forEach(key => {
        if (models[key] && models[key].associate) {
            models[key].associate(models);
        }
    });

    return models;
}
