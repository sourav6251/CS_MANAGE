import { Noticeboard } from "../model/noticeboard.model.js";

class NoticeboardService {
    async createNotice(data) {
        const notice = await Noticeboard.create(data);
        return notice;
    }

    async showNotices(filterData) {
        const { user, department } = filterData;
        const filter = {};

        if (user) filter.user = user;
        if (department) filter.department = department;

        const notices = await Noticeboard.find(filter)
            .populate("user", "name email")
            .populate("department", "name")
            .select("title description media createdAt");

        return notices || null;
    }

    async updateNotice(id, data) {
        const notice = await Noticeboard.findByIdAndUpdate(id, data, {
            new: true,
        });
        return notice;
    }

    async deleteNotice(id) {
        const notice = await Noticeboard.findByIdAndDelete(id);
        return notice;
    }
}

export default new NoticeboardService();
