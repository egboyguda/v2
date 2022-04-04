const Evacuation = require("../models/evacuation");
const Evacuees = require("../models/evacuees");
const moment = require("moment");
const { reject } = require("bcrypt/promises");
exports.get_post = (req, res) => {
  console.log(req.user);
  res.send("hey");
};

exports.getEvacuation = async (req, res) => {
  // const evacuation = await Evacuation.find({});
  const { date } = req.query;
  console.log(date);
  const today = moment(parseInt(date)).startOf("day");
  const end = moment(parseInt(date)).endOf("day");

  //join present evacuees to evacuation
  //
  const evacuation = await Evacuation.aggregate([
    {
      $lookup: {
        from: "evacuees",
        let: { evacuation: "$_id" },
        as: "evacuees",
        pipeline: [
          {
            $match: {
              $and: [
                {
                  date: {
                    $gte: new Date(today),
                  },
                },
                {
                  date: {
                    $lte: new Date(end),
                  },
                },
                {
                  $expr: {
                    $eq: ["$evacuation", "$$evacuation"],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ]);
  console.log(today);
  console.log(evacuation);

  res.send(evacuation);
};

exports.addEvacuation = async (req, res) => {
  const { name, location, capacity, address } = req.body;
  //console.log(req.body);
  try {
    const evacuation = await new Evacuation({
      name,
      capacity,
      location,
      address,
    });

    await evacuation.save();
    res.send("ok");
  } catch (error) {
    res.status(422).send({ error: message });
  }
};

//delete evacuation
exports.deleteEvacuation = async (req, res) => {
  const { _id } = req.body;
  console.log(req.body);

  try {
    await Evacuation.findByIdAndDelete(_id);
    res.send("ok");
  } catch (error) {
    res.status(422).send({ error: message });
  }
};
