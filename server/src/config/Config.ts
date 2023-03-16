const redis = require('redis');
const { Sequelize, DataTypes } = require('sequelize');

// Connect to Redis
const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379,
});

// Connect to PostgreSQL using Sequelize
const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
});

// Define your database schema using Sequelize
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Room = sequelize.define('Room', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  problem_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

const RoomMember = sequelize.define('RoomMember', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
});

const Problem = sequelize.define('Problem', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  example_input: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  example_output: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const CodeSnippet = sequelize.define('CodeSnippet', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define foreign keys
Room.belongsTo(User, { foreignKey: 'owner_id' });
RoomMember.belongsTo(User, { foreignKey: 'user_id' });
RoomMember.belongsTo(Room, { foreignKey: 'room_id' });
CodeSnippet.belongsTo(Room, { foreignKey: 'room_id' });
CodeSnippet.belongsTo(User, { foreignKey: 'user_id' });
Room.belongsTo(Problem, { foreignKey: 'problem_id' });

// Set up Redis pub/sub to broadcast updates to users in real-time
redisClient.on('message', (channel, message) => {
  // When a new code snippet is submitted, broadcast it to all users in the room
  if (channel === 'room_update') {
    const { roomId, codeSnippet } = JSON.parse(message);
    redisClient.publish(`room_${roomId}`, JSON.stringify(codeSnippet));
  }
});

// Join a user to a room and subscribe to real-time updates
async function joinRoom(userId, roomId) {
  // Add the user to the room in PostgreSQL
  const roomMember = await RoomMember.create({
    user_id: userId,
    room_id: roomId,
  });

  // Subscribe the user to real-time updates for the room in Redis
  redisClient.subscribe(`room_${roomId}`);
  redisClient.on('message', (channel, message) => {
    // When a new code snippet is submitted, broadcast it to all users in the room
    if (channel === room_${roomId}) {
    const { codeSnippet, userId } = JSON.parse(message);
    // Publish the new code snippet to Redis
    redisClient.publish('room_update', JSON.stringify({ roomId, codeSnippet }));
    }
    });
    
    return roomMember;
    }
    
    // Submit a code snippet for a room
    async function submitCodeSnippet(userId, roomId, code, language) {
    // Add the code snippet to PostgreSQL
    const codeSnippet = await CodeSnippet.create({
    user_id: userId,
    room_id: roomId,
    code,
    language,
    });
    
    // Publish the new code snippet to Redis
    redisClient.publish('room_update', JSON.stringify({ roomId, codeSnippet }));
    
    return codeSnippet;
    }
    
    // Retrieve all code snippets for a room
    async function getCodeSnippetsForRoom(roomId) {
    const codeSnippets = await CodeSnippet.findAll({
    where: { room_id: roomId },
    include: [{ model: User }, { model: Room }],
    });
    
    return codeSnippets;
    }
    
    // Retrieve all rooms a user is a member of
    async function getRoomsForUser(userId) {
    const rooms = await Room.findAll({
    include: [
    {
    model: RoomMember,
    where: { user_id: userId },
    },
    { model: User },
    { model: Problem },
    ],
    });
    
    return rooms;
    }
    
    // Retrieve a specific room by ID
    async function getRoomById(roomId) {
    const room = await Room.findOne({
    where: { id: roomId },
    include: [
    {
    model: RoomMember,
    include: [{ model: User }],
    },
    { model: User },
    { model: Problem },
    { model: CodeSnippet, include: [{ model: User }] },
    ],
    });
    
    return room;
    }

    module.exports = {
        User,
        Room,
        RoomMember,
        Problem,
        CodeSnippet,
        joinRoom,
        submitCodeSnippet,
        getCodeSnippetsForRoom,
        getRoomsForUser,
        getRoomById,
        };
