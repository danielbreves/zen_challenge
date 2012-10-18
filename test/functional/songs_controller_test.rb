require 'test_helper'

class SongsControllerTest < ActionController::TestCase
	setup do
		@song = songs(:one)
	end

	test "should up vote song" do
		assert_difference('@song.reload.votes') do
			post :up_vote, id: @song, format: :js
		end

		assert_response :success
	end

	test "should show song" do
		get :show, id: @song
		assert_response :success
	end
end
