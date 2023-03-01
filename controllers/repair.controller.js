const Repair = require('../models/repairs.models');
const catchAsync = require('../utils/catchAsync');

exports.findAllRepairs = catchAsync(async (req, res, next) => {
  const repairs = await Repair.findAll({
    attributes: ['id', 'date', 'userId'],
    where: {
      status: ['pending', 'completed'],
    },
    include: [
      {
        model: User,
      },
    ],
  });

  return res.status(200).json({
    status: 'success',
    repairs,
  });
});

exports.findOneRepair = catchAsync(async (req, res, next) => {
  const { id } = req

  return res.status(200).json({
    status: 'success',
    Repair,
  });
});

exports.createRepair = catchAsync(async (req, res, next) => {
  const { date, userId, description, motorsNumber } = req.body;

  const repair = await Repair.create({ date, userId, description, motorsNumber });

  return res.status(201).json({
    status: 'success',
    message: 'Created Repair',
    repair,
  });
});

exports.updateRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  // const repair = await Repair.findOne({
  //   where: {
  //     status: 'pending',
  //     id,
  //   },
  // });

  // if (!repair) {
  //   return res.status(404).json({
  //     status: 'error',
  //     message: 'Repair not found',
  //   });
  // }

  await repair.update({ status });

  return res.status(200).json({
    status: 'success',
  });
});

exports.deleteRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      status: 'pending',
      id,
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'Repair not found',
    });
  }

  await repair.update({ status: 'cancelled' });

  return res.status(200).json({
    status: 'success',
  });
});
