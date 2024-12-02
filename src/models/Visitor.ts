import { Schema, model, models } from 'mongoose';

export interface IVisitor {
  ip: string;
  city: string;
  createdAt?: Date;
}

const VisitorSchema = new Schema<IVisitor>({
  ip: { type: String, required: true },
  city: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Visitor = models.Visitor || model<IVisitor>('Visitor', VisitorSchema);

export default Visitor;
