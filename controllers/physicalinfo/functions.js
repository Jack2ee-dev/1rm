const { PhysicalInfo } = require('../../models/index');

exports.createPhysicalInfo = async ({
  userId,
  height,
  weight,
  skeletalMuscleMass,
  bodyFatMass,
  bodyMassIndex,
  percentBodyFat,
  waistHipRatio,
}) => {
  try {
    const createdPhysicalInfo = await PhysicalInfo.create({
      userId,
      height,
      weight,
      skeletalMuscleMass,
      bodyFatMass,
      bodyMassIndex,
      percentBodyFat,
      waistHipRatio,
    });
    return createdPhysicalInfo;
  } catch (err) {
    console.log(err);
    err.message = `PhysicalInfo: failed to CREATE physicalinfo of ${userId} user`;
    throw err;
  }
};

exports.getPhysicalInfoData = async (userId) => {
  try {
    return await PhysicalInfo.findAll({ where: { userId } });
  } catch (err) {
    console.log(err);
    err.message = `PhysicalInfo: failed to GET physicalinfo of ${userId} user`;
    throw err;
  }
};
