const Temperature = require('../models/temperature');
// const uuidv4 = require('uuid/v4');

exports.saveTemperatureDataPoint = async function(data){

  try{

    const temperatureDataPoint = {
      timestamp: Date.now(),
      sensor_id: data.sensor_id,
      dataset_id: data.dataset_id,
      c1: data.c1,
      c2: data.c2,
    };

    return await Temperature.collection.insertOne(temperatureDataPoint);

  } catch(e){
    throw(e)
  }

};

exports.getDataset = async function(sensor_id, dataset_id){
  const data = await Temperature.find({ "sensor_id": sensor_id, "dataset_id": dataset_id});

  return {
    timestamp: Date.now(),
    data_type: "temperature",
    sensor_id,
    dataset_id,
    data
  };

};
/*



exports.getGroupKeys = async function(groupId){
  const groups = await Groups.find({ "groupId": groupId }).limit(10);
  if(groups[0].type === "public") {
    return groups[0].groupKeys;
  }
};

exports.getGroupGenerators = async function(groupId){
  const groups = await Groups.find({ "groupId": groupId });
  if(groups[0].type === "public") {
    return groups[0].generators;
  }
};

exports.getPublicGroups = async function(){
  return await Groups.find({ "type": "public" });
};

exports.getGroupsByIdsArray = async function(groupsIdsArray){
  return await Groups.find(
    { 'groupId': {'$in': groupsIdsArray }},
    {
      groupId: 1,
      dateCreated: 1,
      title: 1,
      description: 1,
      type: 1,
      membersCount: 1
    }
  )
};

exports.joinGroup = async function(payload){

  try{

    return await Groups.collection.updateOne({ groupId: payload.groupId }, { "$inc": { membersCount: 1 }, "$push": { groupKeys: payload.groupPublicKey }});

  } catch(e){
    throw(e)
  }

};

exports.leaveGroup = async function(groupId, groupPublicKey){

  try{

    return await Groups.collection.updateOne({ groupId }, { "$inc": { membersCount: -1 }, "$pull": { groupKeys: groupPublicKey }});

  } catch(e){
    throw(e)
  }

};

exports.checkKeysRing = async function(groupId, L){

  const group = await Groups.find({ "groupId": groupId });

  console.log("checkKeysRing");
  console.log("L :", L);
  console.log("groupKeys: ", group[0].groupKeys);
  console.log("groupKeys.length: ", group[0].groupKeys.length);


  let validRing = true;
  L.forEach((key) => {
    let foundKey = false;
    group[0].groupKeys.forEach((groupKey) => {
      if(groupKey === key) foundKey = true;
    });
    if(!foundKey) validRing = false;
  });
  return validRing;
};
*/