import { Category } from './Category';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Specifications } from './Specifications';

@Entity("cars")
export class Car {

  @PrimaryColumn()
  id: string;

  @Column()
  name:string;

  @Column()
  description: string;
  
  @Column()
  daily_rate: number;

  @Column()
  available: boolean;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @ManyToMany(() => Specifications)
  @JoinTable({
    name: "specifications_cars",
    joinColumns: [{ name: "car_id"}],
    inverseJoinColumns: [{name: "specification_id"}]
  })
  specifications: Specifications[]

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id"})
  category: Category;

  @Column()
  category_id: string;
  
  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuidv4()
      this.available = true
    }
  }
}