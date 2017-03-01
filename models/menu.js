module.exports = function(sequelize, DataTypes) {
	var start = sequelize.define("start", {
		Name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		Info: {
			type: DataTypes.TEXT,
			allowNull: false,
			len: [1]
		},
		Price: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
});
	var Entre = sequelize.define("Entre", {
		Name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		Info: {
			type: DataTypes.TEXT,
			allowNull: false,
			len: [1]
		},
		Price: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
	});
	var Dessert = sequelize.define("Dessert", {
		Name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		Info: {
			type: DataTypes.TEXT,
			allowNull: false,
			len: [1]
		},
		Price: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
});
	return start;
	return Entre;
	return Dessert;
};