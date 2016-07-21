## provide the Jekyll name of the page or post, e.g. 2013-02-02-notes.md
## Makes this data available as if it was given in the yaml header,
## e.g. we can use `page.path` in Liquid filters and tags to access this name

# Judge the Jekyll version to switch the Jekyll collection settings.
JEKYLL_MIN_VERSION_3 = Gem::Version.new(Jekyll::VERSION) >= Gem::Version.new('3.0.0') unless defined? JEKYLL_MIN_VERSION_3

module Jekyll
  class PagePathGenerator < Generator
    safe true
    ## NOTE: post.dir gives the published directory path, e.g. 2013/02/02/
    # and post.base not valid
    def generate(site)
      puts "Generating page path metadata with base_name.rb"
      start = Time.now
      #site.posts.docs.each do |post|
      posts = JEKYLL_MIN_VERSION_3 ? site.posts.docs : site.posts
      posts.each do |post|
        postname = JEKYLL_MIN_VERSION_3 ? post.url : post.name
        post.data['path'] = postname
        puts post.data['path'] # For debugging post names.
      end
      site.pages.each do |post|
        postname = JEKYLL_MIN_VERSION_3 ? post['name'] : post.name
        post.data['path'] = postname
      end
      finish = Time.now
      puts "Time elapsed #{(finish - start)} seconds"
    end
  end
end
