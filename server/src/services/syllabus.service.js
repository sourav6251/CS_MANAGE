import { Syllabus } from "../model/syllabus.model.js";

class SyllabusService {
    async createSyllabus(data) {
        const syllabus = await Syllabus.create(data);
        return syllabus;
    }

    async updateSyllabus(data, id) {
        const syllabus = await Syllabus.findByIdAndUpdate(id, data, { new: true });
        return syllabus;
    }

    // async showSyllabus({ department, semester, paperCode }) {
    async showSyllabus(data) {
        const department = data.department;
        const semester = data.semester;
        const paperCode = data.paperCode;
        const filter = { department };
        if (semester) filter.semester = semester;
        if (paperCode) filter.paperCode = paperCode;

        const syllabus = await Syllabus.find(filter).select("media");
        console.log(`syllabus skd=>${syllabus}`);
        

        return syllabus || null;
    }

    async deleteSyllabus(id) {
        const result = await Syllabus.findByIdAndDelete(id);
        return result;
    }
}
export default new SyllabusService();
