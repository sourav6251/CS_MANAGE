import { Routines } from "../model/routine.model.js";

class RoutineService {
    // Create a new routine
    async createRoutine(data) {
        const routine = await Routines.create(data);
        return routine;
    }

    // Show routines with optional filters
    async showRoutines(filterData) {
        const { department, semester, user } = filterData;
        const filter = {};
        if (department) filter.department = department;
        if (semester) filter.semester = semester;
        if (user) filter.user = user;

        const routines = await Routines.find(filter)
            .populate("user", "name email")
            .populate("department", "name")
            .populate("semester", "name")
            .select("roomNo schedules");

        return routines || null;
    }

    // Update routine by ID
    async updateRoutine(id, data) {
        const routine = await Routines.findByIdAndUpdate(id, data, {
            new: true,
        });
        return routine;
    }

    // Delete routine by ID
    async deleteRoutine(id) {
        const routine = await Routines.findByIdAndDelete(id);
        return routine;
    }
}

export default new RoutineService();
