class CreateClothingTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :clothing_types do |t|
      t.string :piece
      t.integer :piece_id

      t.timestamps
    end
  end
end
