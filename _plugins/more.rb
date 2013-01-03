module More
    def more(input, type, url)
        if input.include? "<!--more-->"
            if type == "excerpt"
                input.split("<!--more-->").first  + "<p class='more'><a href='#{url}'>Continue read &#9658;</a></p>"
            elsif type == "remaining"
                input.split("<!--more-->").last
            else
                input
            end
        else
            input
        end
    end
end

Liquid::Template.register_filter(More)