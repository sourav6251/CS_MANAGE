import { Meeting } from "../model/metting.model.js";

class MeetingService {
    async createMeeting(data) {
        const meeting = await Meeting.create(data);
        return meeting;
    }

    async showMeeting(data) {
        const user = data.user;
        const userhod = data.userhod;
        const filter = {};
        if (user) filter["participants.user"] = user;
        if (userhod) filter.user = userhod;

        // const meeting = await Meeting.find(filter).select("media");
        const meeting = await Meeting.find(filter)
            .populate("user", "name email") // populate meeting creator
            .populate("participants.user", "name email") // populate participant users
            .select("title description mettingTime participants mettingArea");

        console.log(`syllabus skd=>${syllabus}`);

        return meeting || null;
    }

    async updateMeeting(id, data) {
        const meeting = await Meeting.findByIdAndUpdate(id, data, {
            new: true,
        });
        return meeting;
    }

    async deleteMeeting(id) {
        const meeting = await Meeting.findByIdAndDelete(id);
        return meeting;
    }
}

export default new MeetingService();
