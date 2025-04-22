import {  Mettings } from "../model/metting.model.js";

class MeetingService {
    async createMeeting(data) {
        const meeting = await Mettings.create(data);
        return meeting;
    }

    async showMeeting(data) {
        const { user, userhod, email } = data;
        const filter = {};
    
        if (user) filter.user = user;
        if (userhod) filter.user = userhod;
        if (email) filter.joinusList = email;
    
        const meetings = await Mettings.find(filter)
            // .populate("user", "name email")
            .select("title description mettingTime joinusList mettingArea");
    
        return meetings || null;
    }
    

    async updateMeeting(id, data) {
        const meeting = await Mettings.findByIdAndUpdate(id, data, {
            new: true,
        });
        return meeting;
    }

    async deleteMeeting(id) {
        const meeting = await Mettings.findByIdAndDelete(id);
        return meeting;
    }
}

export default new MeetingService();
