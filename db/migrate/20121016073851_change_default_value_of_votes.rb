class ChangeDefaultValueOfVotes < ActiveRecord::Migration
	def up
		change_column_default :songs, :votes, 0
	end

	def down
		change_column_default :songs, :votes, nil
	end
end
