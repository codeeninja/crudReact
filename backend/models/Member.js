/**
 * Member Model
 * 
 * This model defines the schema for gym members in our MySQL database using Sequelize.
 * It includes all necessary fields to store member information for our gym management system.
 */

module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    // Primary key with auto-increment
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Member name
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Name is required' }
      }
    },
    // Member email (unique)
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: 'Email is required' },
        isEmail: { msg: 'Please provide a valid email' }
      }
    },
    // Phone number
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Phone number is required' }
      }
    },
    // Membership type with validation for allowed types
    membershipType: {
      type: DataTypes.ENUM('Basic', 'Standard', 'Premium'),
      allowNull: false,
      defaultValue: 'Basic',
      validate: {
        isIn: {
          args: [['Basic', 'Standard', 'Premium']],
          msg: 'Membership type must be Basic, Standard, or Premium'
        }
      }
    },
    // Date when member joined
    joiningDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    // Member active status
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    // Table configuration
    tableName: 'members',
    // Add createdAt and updatedAt timestamp fields
    timestamps: true
  });

  return Member;
};
