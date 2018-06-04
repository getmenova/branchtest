var Thing = mongoose.model('Thing', schema);
var m = new Thing;
m.name = 'Statue of Liberty';
m.age = 125;
m.updated = new Date;
m.binary = new Buffer(0);
m.living = false;
m.mixed = {
	any: {
		thing: 'i want'
	}
};
m.markModified('mixed');
m._someId = new mongoose.Types.ObjectId;
m.array.push(1);