import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 

export type UserDocument = User & Document; 

@Schema() 
export class User {
    @Prop() 
    _id: string; 

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    country: string;
}

export const UserSchema = SchemaFactory.createForClass(User); 