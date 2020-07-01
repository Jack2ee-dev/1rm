const functions = require('./functions');

exports.postPhysicalInfo = async (req, res, next) => {
  const {
    height,
    weight,
    skeletalMuscleMass,
    bodyFatMass,
    bodyMassIndex,
    percentBodyFat,
    waistHipRatio,
  } = req.body;
  const { userId } = req.params;

  try {
    const physicalInfo = await functions.createPhysicalInfo({
      userId,
      height,
      weight,
      skeletalMuscleMass,
      bodyFatMass,
      bodyMassIndex,
      percentBodyFat,
      waistHipRatio,
    });
    res.status(201).json(physicalInfo);
  } catch (err) {
    next(err);
  }
};

exports.getPhysicalInfo = async (req, res, next) => {
  try {
    res.status(200).json(await functions.getPhysicalInfoData(req.params.userId));
  } catch (err) {
    next(err);
  }
};
