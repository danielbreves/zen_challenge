class Artist < ActiveRecord::Base
  attr_accessible :name

  validates :name, :presence => true

  has_many :songs, :dependent => :destroy
end
