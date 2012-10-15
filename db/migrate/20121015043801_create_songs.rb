class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :title
      t.string :youtube
      t.string :soundcloud
      t.references :artist

      t.timestamps
    end
    add_index :songs, :artist_id
  end
end
