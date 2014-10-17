require 'feedjira'

# Need to store feed in cache and just call update?

module Jekyll

  class FeedjiraBlockTag < Liquid::Tag
    def render(context)
      feed = Feedjira::Feed.fetch_and_parse("https://github.com/dketch.atom")
      # consider formatting properly
      feed.title + feed.entries[0].content + feed.entries[1].content + feed.entries[2].content + feed.entries[3].content 
    end
  end

end

Liquid::Template.register_tag('feedjira', Jekyll::FeedjiraBlockTag)

