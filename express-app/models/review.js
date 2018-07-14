function Review(sequelize, DataTypes) {
  let review = sequelize.define('review', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    productId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    text: DataTypes.STRING,
  }, {});
  review.associate = function(models) {
    // associations can be defined here
  };
  return review;
};

export default Review;