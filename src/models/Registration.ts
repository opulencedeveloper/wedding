import mongoose, { Schema, Model } from 'mongoose';

export interface IRegistration {
  email: string;
  token: string;
  fullName: string;
  title: string;
  office: string;
  country: string;
  numberOfChildren: string;
  submitted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RegistrationSchema = new Schema<IRegistration>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    office: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: '',
    },
    numberOfChildren: {
      type: String,
      default: '',
    },
    submitted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Registration: Model<IRegistration> =
  mongoose.models.Registration ||
  mongoose.model<IRegistration>('Registration', RegistrationSchema);

export default Registration;

