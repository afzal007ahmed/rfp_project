function vendorsModel( sequelize , DataTypes ){
    const vendors = sequelize.define("vendors" , {
        id : {
            type : DataTypes.UUID ,
            defaultValue : DataTypes.UUIDV4 ,
            primaryKey : true  
        },
        name : {
            type : DataTypes.STRING ,   
            allowNull : false 
        },
        email : {
            type : DataTypes.STRING ,
            allowNull : false ,
            unique : true ,
            validate : {
                isEmail : true 
            }
        }
    }, { 
       tableName : "vendors"
    });
    return vendors ;
}

module.exports = { vendorsModel } ;