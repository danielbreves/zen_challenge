# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = "lodash-rails"
  s.version = "2.3.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Richard Hubers"]
  s.date = "2013-11-15"
  s.description = "Lo-Dash for the Rails asset pipeline"
  s.email = ["richard.hubers@gmail.com"]
  s.homepage = "http://github.com/rh/lodash-rails"
  s.licenses = ["MIT"]
  s.require_paths = ["lib"]
  s.rubygems_version = "1.8.28"
  s.summary = "This gem makes Lo-Dash available for the Rails asset pipeline"

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<railties>, [">= 3.1"])
    else
      s.add_dependency(%q<railties>, [">= 3.1"])
    end
  else
    s.add_dependency(%q<railties>, [">= 3.1"])
  end
end
