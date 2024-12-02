import Visitor, { IVisitor } from '../models/Visitor';

export const resolvers = {
    Query: {
        visitors: async (): Promise<IVisitor[]> => {
            return await Visitor.find({});
        },
        visitorCount: async (): Promise<number> => {
            return await Visitor.countDocuments();
        },
        getVisitorByIP: async (_: unknown, { ip }: { ip: string }): Promise<IVisitor | null> => {
            return await Visitor.findOne({ ip });
        },
    },
    Mutation: {
        addVisitor: async (_: unknown, { ip, city, isp,
            languages,
            latitude,
            longitude,
            organization,
            zipcode,

        }: {
            ip: string;
            city: string,
            isp: string,
            languages: string,
            latitude: string,
            longitude: string,
            organization: string,
            zipcode: string,
        }): Promise<IVisitor> => {
            const visitor = new Visitor({
                ip, city,
                isp,
                languages,
                latitude,
                longitude,
                organization,
                zipcode,
            });
            await visitor.save();
            return visitor;
        },
    },
};
