
module.exports = function(sequelize, DataTypes){
    return sequelize.define("events", {
        event_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }, 
        title: {
            type: DataTypes.STRING
        },
        event_url: {
            type: DataTypes.TEXT
        },
        event_type: {
            type: DataTypes.STRING,
            defaultValue: "event-success"
        },
        event_start_time: {
            type: DataTypes.BIGINT
        },
        event_end_time: {
            type: DataTypes.BIGINT
        },
        owner_username:{
            type: DataTypes.STRING
        },
        owner_email: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: true
    }); 

    
};