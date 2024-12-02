import { Schema, model, models } from 'mongoose';

export interface IVisitor {
  ip: string;
  city: string;
  isp: string;
  languages: string;
  latitude: string;
  longitude: string;
  organization: string;
  zipcode: string;
  createdAt?: Date;
}

const VisitorSchema = new Schema<IVisitor>({
  ip: { type: String, required: true },
  city: { type: String, required: true },
  isp: { type: String, required: true },
  languages: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  organization: { type: String, required: true },
  zipcode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Visitor = models.Visitor || model<IVisitor>('Visitor', VisitorSchema);

export default Visitor;
