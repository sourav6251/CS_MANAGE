import { Certificate } from "../model/certificate.model.js";

class CertificateService {

    async createCertificate(data) {
        const certificate = await Certificate.create(data);
        return certificate;
    }

    async showCertificates(filterData) {
        const { user, status,certificate } = filterData;
        const filter = {};
        if (user) filter.user = user;
        if (certificate) filter.certificate = certificate;
        if (status) filter.status = status;

        const certificates = await Certificate.find(filter)
            .populate("user", "name email")
            .populate("department", "name")
            .populate("semester", "name")
            .select(
                "paperCode paperName studentsNo dateOfExamination designation status"
            );

        return certificates || null;
    }
 
    async updateCertificate(id, data) {
        const certificate = await Certificate.findByIdAndUpdate(id, data, {
            new: true,
        });
        return certificate;
    }

    async deleteCertificate(id) {
        const certificate = await Certificate.findByIdAndDelete(id);
        return certificate;
    }
}

export default new CertificateService();
